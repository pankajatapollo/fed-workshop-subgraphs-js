const resolvers = {
Query: {
    // Returns the order
    order: (_, { id }, { dataSources }) => {
      return dataSources.ordersAPI.getOrder(id);
    }
  },
  Order: {
    __resolveReference: (order, { dataSources }) => {
      return dataSources.ordersAPI.getOrder(order.id);
    },
    buyer: (root) => {
      const customerId = root.customerId;
      return {
        id: customerId
      };
    },
    items: (root) => {
      const variantIds = root.variantIds;
      const items = [];

      for (let index = 0; index < variantIds.length; index++) {
        const item = {
          id: variantIds[index]
        };
        items.push(item);
      }

      return items;
    }
  }

};

module.exports = resolvers;
