export default function () {
    return {
        cartKey: 'cart',
        products: [
            {
                id: 1,
                name: 'Smartphone Xiaomi Mi A1 dual Android one 7.1',
                price: 1199,
                image: 'https://images-americanas.b2w.io/produtos/01/00/sku/29296/2/29296259G1.jpg',
                details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            },
            {
                id: 2,
                name: 'Smartphone Moto G 5S Dual Chip Android 7.0',
                price: 929,
                image: 'https://images-americanas.b2w.io/produtos/01/00/item/132474/0/132474081G1.png',
                details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            },
            {
                id: 3,
                name: 'iPhone 8 Dourado 64GB Tela 4.7" IOS 11',
                price: 3949,
                image: 'https://images-americanas.b2w.io/produtos/01/00/item/132651/7/132651745G1.jpg',
                details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            },
            {
                id: 4,
                name: 'Smartphone Samsung Galaxy S7 Edge',
                price: 1943,
                image: 'https://images-americanas.b2w.io/produtos/01/00/item/125911/8/125911828G1.png',
                details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            },
            {
                id: 5,
                name: 'Smartphone Motorola Moto Z3 Play',
                price: 2999,
                image: 'https://images-americanas.b2w.io/produtos/01/00/sku/29296/2/29296259G1.jpg',
                details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            },
            {
                id: 6,
                name: 'Smartphone Motorola Moto Z3 Play',
                price: 2999,
                image: 'https://images-submarino.b2w.io/produtos/01/00/item/133666/1/133666164G1.jpg',
                details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            },
            {
                id: 7,
                name: 'Smartphone Motorola Moto Z3 Play',
                price: 2999,
                image: 'https://images-americanas.b2w.io/produtos/01/00/sku/29296/2/29296259G1.jpg',
                details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            },
            {
                id: 8,
                name: 'Smartphone Motorola Moto Z3 Play',
                price: 2999,
                image: 'https://images-americanas.b2w.io/produtos/01/00/item/132651/7/132651745G1.jpg',
                details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
            },
        ],
        cartProducts: JSON.parse(localStorage.getItem('cart')) || []
    }
}
