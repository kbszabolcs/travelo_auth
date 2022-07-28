using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;


[Route("api/orders")]
[ApiController]
public class OrdersController : ControllerBase
{

    private IOrderRepository _repository;
    private IMapper _mapper;

    public OrdersController(IOrderRepository repository, IMapper mapper){
        _repository = repository;
        _mapper = mapper;
    }


    [HttpGet]
    public ActionResult<IEnumerable<Order>> GetAllOrders()
    {
        var orderItems = _repository.GetAllOrders();
        var orderReadDtoItems = _mapper.Map<IEnumerable<OrderReadDto>>(orderItems);
        return Ok(orderReadDtoItems);
    }

    [HttpPost]
    public ActionResult<OrderReadDto> CreateOrder(OrderCreateDto orderCreateDto){
        var orderItem = _mapper.Map<Order>(orderCreateDto);
        _repository.CreateOrder(orderItem);
        _repository.SaveChanges();

        var orderReadDto = _mapper.Map<OrderReadDto>(orderItem);

        return Ok(orderReadDto);
    }
    
}