app.get('/', site.index);

// User

app.get('./home/templates/home.html');
//app.all('/user/:id/:op?', user.load);
//app.get('/user/:id', user.view);
//app.get('/user/:id/view', user.view);
//app.get('/user/:id/edit', user.edit);
//app.put('/user/:id/edit', user.update);

// Posts

app.get('/posts', post.list);