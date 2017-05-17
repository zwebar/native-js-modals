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
The ```data-nmodal``` attribute refers to the ID of the targeted modal element.
```html
<a href="" data-nmodal="testModal">Click here</a> to open the modal.
```


### 4. Initialize
```javascript
nModal.init({ watch: true });
```


| Property        | Possible values           | Function  |
| --------------- |:-------------------------| :---------|
| ```watch```           | ```true``` ```false```                | Automatically watches for DOM changes and injects newly created/updated modals |
| ```backdrop```        | ```true``` ```false```                | Adds a backdrop to the modal |
| ```size```            | ```"small"``` ```"large"``` ```"max"```                | Assigns a size to the modal |

There are also in-line properties you can access when triggering a modal.
```html
<a  href=""
    data-nmodal="testModal"
    data-nmodal-size="max">
    Open a maximised modal that targets #testModal
</a>
```

### 5. You're done!
If you want to further customize the modal or use callbacks and custom functions, read below.

## Customization
### Using callbacks
If you want to use a callback, add the ```data-nmodal-callback``` attribute to an element within the modal, like so:

```html
<a href="" data-nmodal-callback="callback">Click to activate callback</a>
```

```javascript
function callback(formElement){
    console.log('Callback called', formElement);
    nModal.close();
}
```

*The callback is by default called by passing the ```<form></form>``` inside the modal, so you can use the data stored in the modal.*