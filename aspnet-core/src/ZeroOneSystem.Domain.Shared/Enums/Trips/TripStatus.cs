using System.ComponentModel;

namespace ZeroOneSystem.Enums.Trips
{
    public enum TripStatus
    {
        [Description("Pending")] 
        Pending,
        [Description("Scheduled")] 
        Scheduled,
        [Description("In Progress")] 
        InProgress,
        [Description("Delayed")] 
        Delayed,
        [Description("Completed")] 
        Completed
    }
}
