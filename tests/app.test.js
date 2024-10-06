const { beforeEach, mock } = require("node:test");
let { app, getProducts, getProductById, addProduct } = require("../index.js");
let http = require("http");

jest.mock("../index.js", () => {
  const actualModule = jest.requireActual("../index.js");
  return {
    ...actualModule,
    getProducts: jest.fn(),
    getProductById: jest.fn(),
    addProduct: jest.fn(),
  };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function tests", () => {
 beforeEach(() => {
   jest.clearAllMocks();
 });

 test("getProducts should return all products", () => {
   const mockProducts = [
    { 'id': 1, 'name': 'Laptop', 'category': 'Electronics' },
    { 'id': 2, 'name': 'Coffee Maker', 'category': 'Appliances' },
    { 'id': 3, 'name': 'Headphones', 'category': 'Electronics' },
    { 'id': 4, 'name': 'Running Shoes', 'category': 'Footwear' }
  ];
  
  getProducts.mockReturnValue(mockProducts);

  let result = getProducts();
  expect(result).toEqual(mockProducts);
  expect(getProducts).toHaveBeenCalled();
 }); 

 test("getProcutsById should return products b y Id", () => {
  const mockProduct =  { 'id': 1, 'name': 'Laptop', 'category': 'Electronics' };
  
  getProductById.mockReturnValue(mockProduct);

  let result = getProductById(1);
  expect(result).toEqual(mockProduct);
  expect(getProductById).toHaveBeenCalledWith(1);
 });

 test("getProductById should return undefined if product Id not found", () => {
     getProductById.mockReturnValue(undefined);

     let result = getProductById(999);
     expect(result).toEqual(undefined);
     expect(getProductById).toHaveBeenCalledWith(999);
 });
 
 test("addProduct should add a new product", () => {
  const newProduct = {id: 5, name: "New Product", category: "New Category"};
  
  addProduct.mockReturnValue(newProduct);

  let result = addProduct(newProduct);
  expect(result).toEqual(newProduct);
  expect(addProduct).toHaveBeenCalledWith(newProduct);
 });
});