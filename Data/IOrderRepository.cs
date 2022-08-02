using System;
using System.Collections.Generic;

public interface IOrderRepository{

    bool SaveChanges();

    IEnumerable<Order> GetAllOrders();

    IEnumerable<Order> GetOrdersOfUser(Guid userGuid);
    
    Order GetOrderById(Guid id);

    void CreateOrder(Order order);

    void DeleteOrder(Order order);

    void DeleteAllOrders();
}