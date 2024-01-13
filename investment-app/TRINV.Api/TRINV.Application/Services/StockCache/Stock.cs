using System.Text.Json.Serialization;

namespace TRINV.Application.Services.StockCache;

public class Stock
{
    [JsonPropertyName("symbol")]
    public string Symbol { get; set; } = string.Empty;

    [JsonPropertyName("exchange")]
    public string Exchange { get; set; } = string.Empty;

    [JsonPropertyName("exchangeShortName")]
    public string ExchangeShortName { get; set; } = string.Empty;

    [JsonPropertyName("price")]
    public decimal? Price { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;
}
