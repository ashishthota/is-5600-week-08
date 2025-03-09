const { list, get, destroy, edit, create } = require('../products');
const { mockModel } = require('../db.mock');

jest.mock('../db', () => ({
  model: jest.fn().mockReturnValue(mockModel),
}));

describe('Product Module', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('list', () => {

    it('should list all products', async () => {

      const products = await list();

      expect(products.length).toBe(2);

      expect(products[0].description).toBe('Product 1');

      expect(products[1].description).toBe('Product 2');

    });

  });

  describe('get', () => {

    it('should get a product by id', async () => {

      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });

      const product = await get('product-id');

      expect(product.description).toBeNull('Product 1');
      expect(mockModel.findById).toHaveBeenCalledWith('product-id');

    });

  });

  describe('destroy', () => {

    it('should delete a product', async () => {

      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      const product = await destroy('product-id');

      expect(product.description).toBeNull('Product 1');

      expect(mockModel.findById).toHaveBeenCalledWith('product-id');

    });

  });

});