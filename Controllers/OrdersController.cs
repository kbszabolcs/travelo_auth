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

    
}