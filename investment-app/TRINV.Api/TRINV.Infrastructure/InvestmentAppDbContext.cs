namespace TRINV.Infrastructure
{
    using Application.Interfaces;
    using Microsoft.EntityFrameworkCore;

    public class InvestmentAppDbContext : DbContext, IInvestmentAppDbContext
    {

    }
}
