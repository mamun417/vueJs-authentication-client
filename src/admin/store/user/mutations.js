import { AbilityBuilder } from "@casl/ability";
import ability from "../../../partial/plugins/acl/ability";

export function updateProfile(state, userInfo) {
    state.user = userInfo;
}

export function updateAbilities(state, userInfo) {
    const { can, rules } = new AbilityBuilder(ability);

    const roleNames = userInfo.roles.map((role) => role.name);

    const permissionNames = userInfo.permissions.map((permission) => permission.name);

    can(permissionNames, "all");

    if (roleNames.includes("admin")) {
        can("manage", "all");
    }

    console.log(rules);

    ability.update(rules);
}
