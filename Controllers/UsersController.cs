using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using travelo_auth.Models;
using Microsoft.AspNetCore.Http;

[Route("api/users")]
[ApiController]
public class UsersController : ControllerBase
{

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UsersController(UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor)
    {
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpGet]
    public ActionResult<ApplicationUser> GetUsers(){
        return Ok(_userManager.Users);
    }

/*     [HttpGet("{userGuid}")]
    public ActionResult<ApplicationUser> GetUserById(Guid userGuid){
        var user = FindUser(userGuid);
        return Ok(user);
    } */

    /* private async Task<IActionResult> FindUser(Guid userGuid)
    {
        var user = await _userManager.FindByIdAsync(userGuid.ToString());
        return user;
    } */
}
