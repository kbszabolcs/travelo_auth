using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using travelo_auth.Models;

[Route("api/users")]
[ApiController]
public class UsersController : ControllerBase
{

    private readonly UserManager<ApplicationUser> _userManager;

    public UsersController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet]
    public ActionResult<ApplicationUser> GetUsers(){
        return Ok(_userManager.Users);
    }

    [HttpGet("{id}")]
    public ActionResult<ApplicationUser> GetUserById(Guid userGuid){
        var user = _userManager.FindByIdAsync(userGuid.ToString());
        
    }
}
