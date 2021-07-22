import { AbilityBuilder } from "@casl/ability";
import ability from "../../ability";

export function updateProfile(state, userInfo) {
    state.user = userInfo;

    const { can, rules } = new AbilityBuilder(ability);

    // if (user.role === 'admin') {
    // can("manage", "all");
    // } else {
    can("read", "all");
    // }

    rules.push({
        action: "manage",
        subject: "all"
    });

    console.log(rules);
    ability.update(rules);
}
