var images = [
	{ url: 'assets/cans.jpg', likes: 0 },
	{ url: 'assets/cups.jpg', likes: 0 },
	{ url: 'assets/basket.jpg', likes: 0 }
];

var collection = new Backbone.Collection(images);

function AppView (collection) {
	this.el = $('<main></main>');
	this.collection = collection;
	this.collection.on('add remove', this.render.bind(this));

	this.el.on('click', '#add-button', function (e) {
		var imageInput = $('#img-input');
		var url = imageInput.val();
		collection.add({
			url: url,
			likes: 0
		});
		imageInput.val('');
	});
}

AppView.prototype.render = function () {
	var _this = this;
	this.el.empty();

	var title = $('<h1 class="title">Kitty Likes!</h1>');
	var formBox = $('<div class="form-box"></div>');
	var input = $('<input/>').attr({type: 'text', id: 'img-input', name: 'img-input'});
	var button = $('<button/>').attr({id: 'add-button'}).text('Add');

	title.appendTo(this.el);
	formBox.appendTo(this.el);
	input.appendTo(formBox);
	button.appendTo(formBox);

	this.collection.each(function (model) {
		var imageView = new ImageView(model);
		imageView.render();
		_this.el.append(imageView.el);
	});
};

function ImageView (model) {
	var _this = this;
	
	this.el = $('<div></div>', {
		class: 'image-box'
	});

	this.model = model;
	this.model.on('change', function () {
		_this.render();
	});

	this.el.on('click', '.likes', function () {
		model.set('likes', model.get('likes') + 1);
	});

	this.el.on('click', '.delete', function () {
		model.destroy();
	});
}

ImageView.prototype.render = function () {
	var url = this.model.get('url');
	var likes = this.model.get('likes');

	this.el.html(`
		<img src="${url}">
		<label class="likes">Likes</label>
		<button class="likes">${likes}</button>
		<button class="delete">Delete</button>
	`);
};

var appView = new AppView(collection);

appView.render();

$(document.body).append(appView.el);