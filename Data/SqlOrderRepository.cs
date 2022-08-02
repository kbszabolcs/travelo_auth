using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class SqlOrderRepository : IOrderRepository
{
    private TripDbContext _context;

    public SqlOrderRepository(TripDbContext context)
    {
        _context = context;
    }

    public bool SaveChanges()
    {
        return (_context.SaveChanges() >= 0);
    }

    public void CreateOrder(Order order)
    {
        if(order is null) throw new System.ArgumentNullException(nameof(order));
        
        _context.Orders.Add(order);
    }

    public IEnumerable<Order> GetAllOrders()
    {
        return _context.Orders.ToList();
    }

    public IEnumerable<Order> GetOrdersOfUser(Guid userGuid)
    {
        return _context.Orders.Where(order => order.Id == userGuid);
    }

    public Order GetOrderById(Guid id)
    {
        return _context.Orders.FirstOrDefault(p => p.Id == id);
    }

    public void DeleteOrder(Order order){
        if(order is null) throw new System.ArgumentNullException(nameof(order));

        _context.Orders.Remove(order);
    }

    public void DeleteAllOrders(){
        _context.Orders.RemoveRange(_context.Orders);
    }
}