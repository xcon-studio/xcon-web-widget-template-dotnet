using XCons.ViteProxy;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add Razor runtime compilation for hot reload
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddRazorPages()
        .AddRazorRuntimeCompilation();
}

// XCon Vite Proxy hosted service
builder.Services.AddXConViteProxy();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
else
{
    // XCon Vite Proxy Middleware - MUST be before UseStaticFiles
    app.UseXConViteProxy(app.Environment);
    app.UseDeveloperExceptionPage();
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();