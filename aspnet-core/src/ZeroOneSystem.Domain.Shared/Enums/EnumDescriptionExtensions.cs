using System;
using System.ComponentModel;

namespace ZeroOneSystem.Enums
{
    public static class EnumDescriptionExtensions
    {
        public static string GetDescription(this Enum value)
        {
            var type = value.GetType();
            var name = Enum.GetName(type, value)
                ?? throw new ArgumentException("Enum does not exist.");

            var field = type.GetField(name)
                ?? throw new ArgumentException("Enum does not exist.");

            var attribute = Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute)) as DescriptionAttribute
                ?? throw new ArgumentException("Enum does not exist.");

            return attribute.Description;
        }
    }
}
