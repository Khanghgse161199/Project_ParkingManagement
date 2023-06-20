using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModels.Token
{
    public class CheckTokenViewModel
    {
        [Required]
        public string accessToken { get; set; }
    }
}
