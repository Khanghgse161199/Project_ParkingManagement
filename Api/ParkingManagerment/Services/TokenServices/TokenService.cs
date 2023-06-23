using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ViewModels.Token;


namespace Services.TokenServices
{ 
    public class TokenService: ITokenService
    {
        private SymmetricSecurityKey _key;
        public TokenService(IConfiguration configuration)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["AppSettings:SecretKey"]));         
        }
        public CreateTokenResultViewModel GenerateToken(string userId, string id)
        {
           
            //JwtSecurityTokenHandler cung cấp các phương thức để tạo, xác minh và xử lý mã token trong JWT.
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            //tạo một đối tượng SigningCredentials, đại diện cho thông tin xác thực khi ký mã thông báo JWT.
            //Trong trường hợp này SecurityAlgorithms.HmacSha256Signature là thuật toán sử dụng để ký mã thông báo cho _Key.
            var signingCredentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>
            {
                new Claim("TokenId",id),
                new Claim("UserId",userId),
                new Claim(ClaimTypes.Role,"User"),            
            };
            //tạo một đối tượng SecurityTokenDescriptor, đại diện cho thông tin và cấu hình của token trong JWT
            var descripstion = new SecurityTokenDescriptor
            {
                Issuer = "youAreHandSome",
                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(2),
                Audience = "EveryOne",
                SigningCredentials = signingCredentials,
                //(subject)trong JWT là thông tin về đối tượng mà mã thông báo đang xác thực
                Subject = new System.Security.Claims.ClaimsIdentity(claims)
            };

            //tạo token trong JWT bằng cách gọi phương thức CreateToken
            var SecurityToken = jwtTokenHandler.CreateToken(descripstion);
            //trả về một chuỗi biểu diễn của mã thông báo JWT đã được tạo bằng cách gọi phương thức WriteToken
            return new CreateTokenResultViewModel()
            {
                AccessToken = jwtTokenHandler.WriteToken(SecurityToken)
            };
        }

        public ClaimsPrincipal DecodeToken(string token)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = _key;
            var tokenValidateParam = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                IssuerSigningKey = _key,
                ValidIssuer = "youAreHandSome",    
                ValidAudience = "EveryOne",
                ClockSkew = TimeSpan.Zero,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = false
            };
            try
            {
                //check 1: AccessToken valid format
                var tokenInVerification = jwtTokenHandler.ValidateToken(token, tokenValidateParam, out var validatedToken);
                //check 2: Check accessToken expire?
                long utcExpireDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
                var expireDate = convertToUnixTime(utcExpireDate);
                if (expireDate < DateTime.UtcNow)
                {
                    return null;
                }
                else
                {
                    return tokenInVerification;
                }
            }
            catch
            {
                return null;
            }           
        }

        public DateTime convertToUnixTime(long longSecond)
        {
            DateTimeOffset dateTimeUtc = DateTimeOffset.FromUnixTimeSeconds(longSecond);
            DateTime dateTimeUtcOnly = dateTimeUtc.UtcDateTime;
            return dateTimeUtcOnly;
        }
    }
}
