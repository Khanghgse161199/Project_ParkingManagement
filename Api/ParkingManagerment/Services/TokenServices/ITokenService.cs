using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ViewModels.Token;

namespace Services.TokenServices
{
    public interface ITokenService
    {
        CreateTokenResultViewModel GenerateToken(string userId);
        ClaimsPrincipal DecodeToken(string token);
    }
}
