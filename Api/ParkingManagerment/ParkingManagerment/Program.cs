using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Services.AuthServices;
using Services.TokenServices;
using System.Text;

namespace ParkingManagerment
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddCors();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();
            // Add services to the container.

          
            builder.Services.AddAuthentication(p =>
            {
                //đặt các giá trị mặc định cho các scheme(giao thức xác thực) được sử dụng để xác thực và xử lý thất bại xác thực.               
                p.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                p.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                //Trong trường hợp này, cả hai giá trị đều được đặt là JwtBearerDefaults.AuthenticationScheme

                //cấu hình xác thực JWT Bearer cho giao thức Authentication
            }).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, x =>
            {
                //SymmetricSecurityKey loại biến cung cấp một mảng byte chứa giá trị của khóa bí mật đối xứng (dùng để ký và xác minh token trong JWT)
                var _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:SecretKey"]));

                //đặt các tham số cho việc xác thực token JWT
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                {
                    //Xác định khóa bí mật được sử dụng để xác minh chữ ký của token (Ký)
                    IssuerSigningKey = _key,
                    //Xác định Issuer(người tạo) token 
                    ValidIssuer = "youAreHandSome",
                    //xác thực xem có kiểm tra Issuer hay không
                    ValidateIssuer = true,
                    //Xác định Audience(đối tượng sử dụng) token
                    ValidAudience = "EveryOne",
                    //xác thực xem có kiểm tra Audience hay không
                    ValidateAudience = true,
                    //Xác định xem có kiểm tra lifetime(thời hạn đặt cho token) của token hay không.
                    ValidateLifetime = true,
                    // Đặt thời gian trễ cho việc xác thực thời gian
                    ClockSkew = TimeSpan.Zero,//(0)
                };
            });

            builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
            builder.Host.ConfigureContainer<ContainerBuilder>(builder =>
            {
                builder.RegisterType<TokenService>().As<ITokenService>();
                builder.RegisterType<AuthService>().As<IAuthService>();
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                    options.RoutePrefix = string.Empty;
                });
            }

            app.UseCors(t => t.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());
            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseAuthentication();

            app.MapControllers();

            app.Run();
        }
    }
}