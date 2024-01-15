using ClosedXML.Excel;

namespace ZeroOneSystem.Extensions
{
    public static class ExportExcelStyleExtensions
    {
        public static void BeautifySheet(this IXLWorksheet sheet)
        {
            sheet.BeautifyHeader();
            sheet.SetBorders();
            sheet.AutoAdjustColumns();
        }

        private static void BeautifyHeader(this IXLWorksheet sheet)
        {
            sheet.RangeUsed().FirstRowUsed().Style
                .Fill.SetBackgroundColor(XLColor.Gray)
                .Font.SetBold(true);
        }

        private static void SetBorders(this IXLWorksheet sheet)
        {
            sheet.RangeUsed().Style
                .Border.SetOutsideBorder(XLBorderStyleValues.Medium)
                .Border.SetInsideBorder(XLBorderStyleValues.Medium);
        }

        private static void AutoAdjustColumns(this IXLWorksheet sheet)
        {
            sheet.Columns().AdjustToContents();
        }
    }
}
