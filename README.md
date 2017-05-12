# native-js-modals
_Easily create modals without external dependencies._
_aka nModal_

## Installation and usage

### 1. Add &lt;script&gt; and &lt;link&gt; tag
```html
<script src="./js/native-modals.min.js"></script>
<link href="./css/nmodal.css" rel="stylesheet" type="text/css" media="screen, handheld, projection">
```

### 2. Create a modal
```html
<div id="testModal" class="nModal">
    <form action="">
        <div class="nModal-header">Modal 1</div>
        <div class="nModal-body">Body of the modal</div>
        <div class="nModal-buttons">
            <a href="" class="nModal-button nModal-button__ok" data-nmodal-callback="callback">Ok</a>
            <a href="" class="nModal-button nModal-button__cancel">Cancel</a>
        </div>
    </form>
</div>
```
#### 2.b or... put in anything you'd like. as long as it follows the following pattern:
```html
<div id="modal">
  <form action="">
    <!-- Your content here. -->
  </form>
</div>
```

### 3. Create a trigger
```html
<a href="" data-bmodal="testModal">Click here</a> to open the modal.<br>
```


### 4. Initialize
```javascript
bModal.init({
  // Options go here
});
```


| Property        | Default Value           | Function  |
| --------------- |:-----------------------:| ---------:|
| watch      | true/false | Automatically watches for DOM changes and injects newly created/updated modals

### 5. You're done!
If you want to further customize the modal or use callbacks and custom functions, read below.


## Customization
### Using callbacks
If you want to use a callback, add the ```data-nmodal-callback``` attribute, like so:

```html
<a href="" data-nmodal-callback="callback">Click to activate callback</a>
```

```javascript
function callback(){
  console.log('callback called');
}
```