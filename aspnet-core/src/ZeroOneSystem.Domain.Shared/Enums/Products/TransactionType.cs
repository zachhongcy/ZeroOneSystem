using System.ComponentModel;

namespace ZeroOneSystem.Enums.Products
{
    public enum TransactionType
    {
        [Description("Stock In")]
        StockIn,
        [Description("Stock Out")]
        StockOut
    }
}
