using MediatR;
using System.Text.Json;
using System.Text.Json.Serialization;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries.DigitalCurrency;

public record GetDigitalCurrencyListQuery : IRequest<OperationResult<List<GetDigitalCurrencyModel>>>;

internal class GetDigitalCurrencyListQueryHandler : IRequestHandler<GetDigitalCurrencyListQuery, OperationResult<List<GetDigitalCurrencyModel>>>
{
    public async Task<OperationResult<List<GetDigitalCurrencyModel>>> Handle(GetDigitalCurrencyListQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<List<GetDigitalCurrencyModel>>();
        var httpClient = new HttpClient();

        var response = await httpClient.GetAsync("https://api.coincap.io/v2/assets");
        var content = await response.Content.ReadAsStringAsync();
        var parsed = JsonDocument.Parse(content);
        var result = parsed.Deserialize<DigitalCurrencyResult>();

        if (result is null)
            return operationResult.ReturnWithErrorMessage(new BadRequestException());

        operationResult.RelatedObject = result.Data;

        return operationResult;
    }
}

public class GetDigitalCurrencyModel
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("rank")]
    public string Rank { get; set; } = string.Empty;

    [JsonPropertyName("symbol")]
    public string Symbol { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("supply")]
    public string? Supply { get; set; }

    [JsonPropertyName("maxSupply")]
    public string MaxSupply { get; set; } = string.Empty;

    [JsonPropertyName("marketCapUsd")]
    public string MarketCapUsd { get; set; } = string.Empty;

    [JsonPropertyName("volumeUsd24Hr")]
    public string VolumeUsd24Hr { get; set; } = string.Empty;

    [JsonPropertyName("priceUsd")]
    public string PriceUsd { get; set; } = string.Empty;

    [JsonPropertyName("changePercent24Hr")]
    public string ChangePercent24Hr { get; set; } = string.Empty;
}

internal class DigitalCurrencyResult
{
    [JsonPropertyName("data")]
    public List<GetDigitalCurrencyModel> Data { get; set; } = new();
}
