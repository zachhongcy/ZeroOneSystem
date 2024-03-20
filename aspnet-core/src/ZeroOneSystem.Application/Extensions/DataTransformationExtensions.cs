using System;
using System.Text;
using ZeroOneSystem.Constants;
using ZeroOneSystem.ProductGroups;
using ZeroOneSystem.Products;
using ZeroOneSystem.Products.Dto;
using ZeroOneSystem.Trips;
using ZeroOneSystem.Trips.Dto;

namespace ZeroOneSystem.Extensions
{
    public static class DataTransformationExtensions
    {
        private const string SITE = "Site: ";
        private const string CONTACT_PERSON = "Contact Person: ";
        private const string CONTACT_NO = "Contact No.: ";

        private const string QUANTITY_PR = "PR - ";
        private const string QUANTITY_PA = "PA - ";
        private const string QUANTITY_RU = "RU - ";
        private const string QUANTITY_RN = "RN - ";

        public static string ToExcelDateString(this DateTime dateTime)
        {
            return dateTime.ToString(ExportConstants.DATE_FORMAT);
        }

        public static string ToExcelDateTimeString(this DateTime dateTime)
        {
            return dateTime.ToString(ExportConstants.DATETIME_FORMAT);
        }

        public static string ToTimestampString(this DateTime dateTime)
        {
            return dateTime.ToString(ExportConstants.TIMESTAMP_FORMAT);
        }

        public static string GetProductGroupCodeName(this ProductGroup productGroup)
        {
            return new StringBuilder(productGroup.ShortCode)
                .Append(" - ")
                .Append(productGroup.Name)
                .ToString();
        }

        public static string GetTripSiteDetails(this Trip trip)
        {
            return GenerateTripSiteDetails(trip.SiteAddress, trip.ContactPerson, trip.ContactNo);
        }

        public static string GetTripSiteDetails(this TripDto tripDto)
        {
            return GenerateTripSiteDetails(tripDto.SiteAddress, tripDto.ContactPerson, tripDto.ContactNo);
        }

        private static string GenerateTripSiteDetails(string siteAddress, string contactPerson, string contactNo)
        {
            return new StringBuilder(SITE)
                .Append(siteAddress)
                .AppendLine()
                .Append(CONTACT_PERSON)
                .Append(contactPerson)
                .AppendLine()
                .Append(CONTACT_NO)
                .Append(contactNo)
                .ToString();
        }

        public static string GetProductQuantities(this Product product)
        {
            return GenerateProductQuantities(product.QuantityPr, product.QuantityPa, product.QuantityRu, product.QuantityRn);
        }

        public static string GetProductQuantities(this ProductDto product)
        {
            return GenerateProductQuantities(product.QuantityPr, product.QuantityPa, product.QuantityRu, product.QuantityRn);
        }

        private static string GenerateProductQuantities(int quantityPr, int quantityPa, int quantityRu, int quantityRn)
        {
            return new StringBuilder(QUANTITY_PR)
                .Append(quantityPr)
                .AppendLine()
                .Append(QUANTITY_PA)
                .Append(quantityPa)
                .AppendLine()
                .Append(QUANTITY_RU)
                .Append(quantityRu)
                .AppendLine()
                .Append(QUANTITY_RN)
                .Append(quantityRn)
                .ToString();
        }
    }
}
