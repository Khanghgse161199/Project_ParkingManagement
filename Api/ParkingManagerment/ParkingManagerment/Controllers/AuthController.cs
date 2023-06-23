using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.AuthServices;
using Services.TokenServices;
using System.Security.Claims;
using ViewModels.Token;

namespace ParkingManagerment.Controllers
{
    [Authorize(Roles = "User")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IAuthService _AuthService;
        public AuthController(ITokenService tokenService, IAuthService authService)
        {
            _tokenService = tokenService;
            _AuthService = authService;
        }
        
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> Login(LoginViewModel info)
        {
            if (info != null && !string.IsNullOrEmpty(info.UserId))
            {
                if (ModelState.IsValid)
                {
                    LoginResultViewModel newToken = await _AuthService.LoginAsync(info.UserId);
                    if(newToken != null && !string.IsNullOrEmpty(newToken.AccessToken))
                    {
                        return newToken.AccessToken;
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    var error = ModelState.Select(p => p.Value.Errors)
                        .Where(p => p.Count > 0)
                        .ToList();
                    return BadRequest(error);
                }
            }
            else return BadRequest();
        }

        [HttpPost("LogOut")]
        [AllowAnonymous]
        public async Task<ActionResult> LogOut(LogOutViewModel info)
        {
            if (!string.IsNullOrEmpty(info.AccessToken) && !string.IsNullOrEmpty(info.UserId))
            {
                if (ModelState.IsValid)
                {
                    var isLogOut = await _AuthService.LogOutAsync(info.AccessToken,info.UserId);
                    if (isLogOut)
                    {
                        return Ok();
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    var error = ModelState.Select(p => p.Value.Errors)
                        .Where(p => p.Count > 0)
                        .ToList();
                    return BadRequest(error);
                }
            }
            else return BadRequest();
        }

        [HttpPost("CheckToken")]
        [AllowAnonymous]
        public async Task<ActionResult<CheckTokenResultViewModel>> CheckToken(CheckTokenViewModel Token)
        {
            if (!string.IsNullOrEmpty(Token.accessToken))
            {
                try
                {
                    var result = await _AuthService.CheckTokenAsync(Token.accessToken);
                    if (result != null)
                    {
                        return Ok(result);
                    }
                    else return BadRequest();
                }
                catch
                {
                    return BadRequest(null!);
                }
            }
            else
            {
                return NotFound(null!);
            }
        }
    }
}
