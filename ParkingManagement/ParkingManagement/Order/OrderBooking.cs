using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParkingManagement.Order
{
    public class OrderBooking
    {
        public string Id { get; set; }
        public string IdSlot { get; set; }
        public string IdUser { get; set; }
        public string NameCutomer { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string LicensePlates { get; set; }
        public string Message { get; set; }
        public string TimeCome { get; set; }
        public string TimeOut { get; set; }
        public string DateTime { get; set; }
        public bool IsActive { get; set; }
        public Status status { get; set; }
        public double Total { get; set; }
        public string ReservationFee { get; set; }

        public string codeConfirm { get; set; }
        public bool IsRating { get; set; }

        public enum Status
        {
            Confirm,
            UnConfirm,
        }

        public OrderBooking(string id, string idSlot, string idUser, string nameCutomer, string email, string phone, string licensePlates, string message, string timeCome, string timeOut, string dateTime, bool isActive, Status status, double total, string reservationFee, string codeConfirm)
        {
            Id = id;
            IdSlot = idSlot;
            IdUser = idUser;
            NameCutomer = nameCutomer;
            Email = email;
            Phone = phone;
            LicensePlates = licensePlates;
            Message = message;
            TimeCome = timeCome;
            TimeOut = timeOut;
            DateTime = dateTime;
            IsActive = isActive;
            this.status = status;
            Total = total;
            ReservationFee = reservationFee;
            this.codeConfirm = codeConfirm;
        }
    }
}
