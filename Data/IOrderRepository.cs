using System;
using System.Collections.Generic;

public interface IOrderRepository{

    bool SaveChanges();

    IEnumerable<Order> GetAllOrders();
    
    Order GetOrderById(Guid id);

    void CreateOrder(Order order);

    void UpdateOrder(Order order);

    void DeleteOrder(Order order);

    void DeleteAllOrders();
}