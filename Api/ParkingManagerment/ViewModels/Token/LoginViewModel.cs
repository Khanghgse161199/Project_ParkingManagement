using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModels.Token
{
    public class LoginViewModel
    {
        [Required]
        public string UserId { get; set; }
    }
}
