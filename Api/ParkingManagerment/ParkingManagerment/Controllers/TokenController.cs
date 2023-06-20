using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.TokenServices;
using System.Security.Claims;
using ViewModels.Token;

namespace ParkingManagerment.Controllers
{
    [Authorize(Roles = "User")]
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        public TokenController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }
        
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> Login(LoginViewModel info)
        {
            if (info != null && !string.IsNullOrEmpty(info.UserId))
            {
                if (ModelState.IsValid)
                {
                    var newToken = _tokenService.GenerateToken(info.UserId);
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

        [HttpPost("CheckToken")]
        [AllowAnonymous]
        public async Task<ActionResult<CheckTokenResultViewModel>> CheckToken(CheckTokenViewModel Token)
        {
            if (!string.IsNullOrEmpty(Token.accessToken))
            {
                try
                {
                    var checkToken = _tokenService.DecodeToken(Token.accessToken);
                    if (checkToken != null)
                    {
                        var role = checkToken.Claims.First(p => p.Type == ClaimTypes.Role).Value;
                        if (role == "User")
                        {
                            return new CheckTokenResultViewModel() { 
                                IdUser = checkToken.Claims.First(p => p.Type == "UserId").Value,
                                Role = checkToken.Claims.First(p => p.Type == ClaimTypes.Role).Value
                            };
                        }
                        else return BadRequest(null!);
                    }
                    else return BadRequest(null!);
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
