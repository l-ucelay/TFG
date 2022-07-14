pragma solidity ^0.8.0;
contract Marketplace {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;
    struct Product {
        uint id;
        string name;
        string carac;
        uint price;
        address owner;
        bool purchased;
    }
    event ProductCreated(
        uint id,
        string name,
        string carac,
        uint price,
        address owner,
        bool purchased
    );
    event ProductPurchased(
        uint id,
        string name,
        string carac,
        uint price,
        address owner,
        bool purchased
    );
    constructor() public {
        name = "dApp Marketplace";
    }
    function createProduct(string memory _name, string memory _carac, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        require(bytes(_carac).length > 1);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount ++;
        // Create the product
        products[productCount] = Product(productCount, _name, _carac, _price, msg.sender, false);
        // Trigger an event
        emit ProductCreated(productCount, _name, _carac, _price, msg.sender, false);
    }

    function purchaseProduct(uint _id) public payable {
        // Buscar producto seleccionado
        Product memory _product = products[_id];
        // Buscar propietario del producto
        address _seller = _product.owner;
        // Asegurarse que el producto tiene un ID valido
        require(_product.id > 0 && _product.id <= productCount);
        // Comprobante de que el usuario dispone del ETH necesario
        require(msg.value >= _product.price);
        // Comprobante de que el producto aún no ha sido comprado
        require(!_product.purchased);
        // Comprobante de que el comprador no es el propio vendedor del producto
        require(_seller != msg.sender);
        // Tranferencia de la propiedad al comprador
        _product.owner = msg.sender;
        // Marcaje como vendido
        _product.purchased = true;
        // Actualización del producto
        products[_id] = _product;
        // Pago al vendedor con el ETH correspondiente
        payable(_seller).transfer(msg.value);
        // Disparador del evento
        emit ProductPurchased(productCount, _product.name, _product.carac, _product.price, msg.sender, true);
    }

}