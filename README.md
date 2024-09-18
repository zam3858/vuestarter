# Laravel, Typescript and Vue

- Start with a new laravel project

```bash
 composer create-project --prefer-dist laravel/laravel laravelstarter
```

- Include Laravel Breeze starter pack

```bash
composer require laravel/breeze --dev
```

- Configure breeze with Vue, SSR, Typescript and Pest (optional) 
```bash
php artisan breeze:install vue \
  --typescript \
  --ssr \
  --pest
``` 

- Copy template (in this example materio) to `resources` folder. Also in this example development is set in `materio/src/pages` 
- Merge template's package.json requirement into Laravel's package.json.
- Merge template's vite.config.js into Laravel's vite.config.js. Make sure configuration set to respective path in template
- Run `npm i` to install npm dependencies
- Update routes/web.php with code to handle route

```php
Route::get('{view}', AppController::class)
    ->where('view', '(.*)');

```

- Update `resources/views/app.blade.php` @vite to include to below. Materio in the path below is template

```php
@vite(['resources/js/materio/src/main.ts', "resources/js/materio/src/pages/". request()->path() .".vue"])
```

- Run npm run dev to view template and vuew
```bash
    npm run dev
```

