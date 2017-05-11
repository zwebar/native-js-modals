# native-js-modals
_Easily create modals without external dependencies._

### 1. Add &lt;script&gt; tag
```html
<script src="./js/native-modals.min.js"></script>
```

### 2. Initialize
```javascript
bModal.init({
  // Options go here
});
```


| Property        | Default Value           | Function  |
| --------------- |:-----------------------:| ---------:|
| watch      | true/false | Automatically watches for DOM changes and injects newly created/updated modals

### 3. Create a modal
```html

    <div id="testModal" class="bModal">
        <form action="">
            <div class="bModal-header">Modal 1</div>
            <div class="bModal-body">Body of the modal</div>
            <div class="bModal-buttons">
                <a href="" class="bModal-button bModal-button__ok" data-bmodal-callback="callback">Ok</a>
                <a href="" class="bModal-button bModal-button__cancel">Cancel</a>
            </div>
        </form>
    </div>
```
#### 3.b or... put in anything you'd like. as long as it follows the following pattern;
```html
<div id="modal">
  <form>
    Your content here.
  </form>
</div>
```

### 4. Create a trigger
```html
<a href="" data-bmodal="testModal">Click here</a> to open the modal.<br>
```

### 5. You're done!