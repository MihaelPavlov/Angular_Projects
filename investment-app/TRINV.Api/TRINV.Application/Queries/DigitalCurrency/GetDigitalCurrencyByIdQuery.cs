using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;
using TRINV.Shared.Business.Exceptions;
using TRINV.Shared.Business.Extension;
using TRINV.Shared.Business.Utilities;

namespace TRINV.Application.Queries.DigitalCurrency;

public class GetDigitalCurrencyByIdQuery : IRequest<OperationResult<GetDigitalCurrencyByIdQueryModel>>
{
    [Required]
    public string Id { get; set; } = null!;

    public GetDigitalCurrencyByIdQuery(string id)
    {
        this.Id = id;
    }
}

internal class GetDigitalCurrencyByIdQueryHandler : IRequestHandler<GetDigitalCurrencyByIdQuery, OperationResult<GetDigitalCurrencyByIdQueryModel>>
{
    public async Task<OperationResult<GetDigitalCurrencyByIdQueryModel>> Handle(GetDigitalCurrencyByIdQuery request, CancellationToken cancellationToken)
    {
        var operationResult = new OperationResult<GetDigitalCurrencyByIdQueryModel>();
        var httpClient = new HttpClient();

        //TODO: Need a fix currently is not working becasue assetId-symbol is different then just id 
        var response = await httpClient.GetAsync($"https://api.coincap.io/v2/assets/{request.Id}");
        var content = await response.Content.ReadAsStringAsync();
        var parsed = JsonDocument.Parse(content);
        var result = parsed.Deserialize<DigitalCurrencyByIdResult>();

        if (result is null)
            return operationResult.ReturnWithErrorMessage(new BadRequestException());

        operationResult.RelatedObject = result.Data;

        return operationResult;
    }
}

public class GetDigitalCurrencyByIdQueryModel
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

internal class DigitalCurrencyByIdResult
{
    [JsonPropertyName("data")]
    public GetDigitalCurrencyByIdQueryModel Data { get; set; } = new();
}

