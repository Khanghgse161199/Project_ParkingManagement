using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using Services.Data;
using Services.TokenServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ViewModels.Token;

namespace Services.AuthServices
{
    public interface IAuthService
    {
        Task<LoginResultViewModel> LoginAsync(string userId);
        Task<bool> LogOutAsync(string token, string userId);
        Task<CheckTokenResultViewModel> CheckTokenAsync(string token);
    }
    public class AuthService: IAuthService
    {
        private readonly ITokenService _tokenService;

        public AuthService(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        public async Task<LoginResultViewModel> LoginAsync(string userId)
        {
            var ListTokens = new List<Token>();
            IFirebaseConfig config = new FirebaseConfig()
            {
                AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
                BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",

            };
            bool error = false;
            try
            {   
                IFirebaseClient client = new FireSharp.FirebaseClient(config);
                FirebaseResponse response = await client.GetAsync("ListToken");
                ListTokens = response.ResultAs<List<Token>>();
                error = false;
            }
            catch
            {
                error = true;
                string newTokenId = Guid.NewGuid().ToString();
                var newToken = _tokenService.GenerateToken(userId, newTokenId);
                var newTokenDb = new Token()
                {
                    Id = Guid.NewGuid().ToString(),
                    TokenId = newTokenId,
                    UserId = userId,
                    IsActive = true,
                    CreateDate = DateTime.UtcNow,
                    UpdateDate = DateTime.UtcNow
                };
                ListTokens.Add(newTokenDb);
                IFirebaseClient client = new FirebaseClient(config);
                SetResponse setResponse = await client.SetAsync("ListToken", ListTokens);
                return new LoginResultViewModel()
                {
                    AccessToken = newToken.AccessToken
                };
            }
            if (!error) {
                if (!string.IsNullOrEmpty(userId))
                {
                    var currentToken = ListTokens.Where(p => p.UserId == userId && p.IsActive).FirstOrDefault();
                    if (currentToken != null)
                    {
                        string newTokenId = Guid.NewGuid().ToString();
                        var newToken = _tokenService.GenerateToken(userId, newTokenId);
                        currentToken.TokenId = newTokenId;
                        currentToken.UserId = userId;
                        currentToken.UpdateDate = DateTime.UtcNow;
                        IFirebaseClient client = new FirebaseClient(config);
                        SetResponse setResponse = await client.SetAsync("ListToken", ListTokens);
                        return new LoginResultViewModel()
                        {
                            AccessToken = newToken.AccessToken
                        };
                    }
                    else
                    {
                        string newTokenId = Guid.NewGuid().ToString();
                        var newToken = _tokenService.GenerateToken(userId, newTokenId);
                        var newTokenDb = new Token()
                        {
                            Id = Guid.NewGuid().ToString(),
                            TokenId = newTokenId,
                            UserId = userId,
                            IsActive = true,
                            CreateDate = DateTime.UtcNow,
                            UpdateDate = DateTime.UtcNow
                        };
                        ListTokens.Add(newTokenDb);
                        IFirebaseClient client = new FirebaseClient(config);
                        SetResponse setResponse = await client.SetAsync("ListToken", ListTokens);
                        return new LoginResultViewModel()
                        {
                            AccessToken = newToken.AccessToken
                        };
                    }
                }
                else return null;
            } else return null;
        }

        public async Task<bool> LogOutAsync(string token, string userId)
        {
            var ListTokens = new List<Token>();
            IFirebaseConfig config = new FirebaseConfig()
            {
                AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
                BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",

            };
            if (!string.IsNullOrEmpty(token) && !string.IsNullOrEmpty(userId))
            {
                IFirebaseClient client = new FirebaseClient(config);
                FirebaseResponse response = await client.GetAsync("ListToken");
                ListTokens = response.ResultAs<List<Token>>();

                var decodeToken = _tokenService.DecodeToken(token);
                if(decodeToken != null)
                {
                    string TokenId = decodeToken.Claims.FirstOrDefault(p => p.Type == "TokenId").Value;
                    string UserId = decodeToken.Claims.First(p => p.Type == "UserId").Value;
                    if (UserId == userId)
                    {
                        var currentToken = ListTokens.Where(p => p.TokenId == TokenId).FirstOrDefault();
                        currentToken.IsActive = false;
                        SetResponse setResponse = await client.SetAsync("ListToken", ListTokens);
                        return true;
                    }
                    else return false;
                }else return false;

            }
            else return false;
        }

        public async Task<CheckTokenResultViewModel> CheckTokenAsync(string token)
        {
            var ListTokens = new List<Token>();
            IFirebaseConfig config = new FirebaseConfig()
            {
                AuthSecret = "vTlGsUNSeH6XbfJogwwn694XxLryWJ7SK9gQy7rk",
                BasePath = "https://fir-js-a0ffd-default-rtdb.firebaseio.com/",

            };
            if (!string.IsNullOrEmpty(token))
            {
                IFirebaseClient client = new FirebaseClient(config);
                FirebaseResponse response = await client.GetAsync("ListToken");
                ListTokens = response.ResultAs<List<Token>>();
                var decodeToken = _tokenService.DecodeToken(token);
                if (decodeToken != null)
                {
                    var tokenId = decodeToken.Claims.FirstOrDefault(p => p.Type == "TokenId").Value;
                    if (!string.IsNullOrEmpty(tokenId))
                    {
                        var currentToken = ListTokens.Where(p => p.TokenId == tokenId && p.IsActive).FirstOrDefault();
                        if (currentToken != null)
                        {
                            var role = decodeToken.Claims.First(p => p.Type == ClaimTypes.Role).Value;
                            if (role == "User")
                            {
                                return new CheckTokenResultViewModel()
                                {
                                    IdUser = decodeToken.Claims.First(p => p.Type == "UserId").Value,
                                    Role = decodeToken.Claims.First(p => p.Type == ClaimTypes.Role).Value
                                };
                            }
                            else return null!;
                        }
                        else return null;
                    }
                    else return null;
                }
                else return null;
            }
            else return null;
        }
    }
}
