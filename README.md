
# Segment Builder React App

A React app to create and save user segments with dynamic schemas.

## Features

- Click **Save segment** to open the modal.
- Enter a segment name.
- Add schemas from a dropdown (First Name, Last Name, Gender, Age, Account Name, City, State).
- Click **+ Add new schema** to add the selected schema to the blue box.
- Added dropdowns only show unselected options.
- Remove schemas dynamically.
- Save the segment — JSON is sent to a webhook.
- Toast notifications for success/error messages.
- Bootstrap modal with fade effect.


## Installation & Run

```bash
git clone https://github.com/Sarathadevi-I/segment-builder.git
cd segment-builder
npm install
npm start
````

Open [http://localhost:3000](http://localhost:5173) in your browser.

## Webhook Setup

* Use **Postman Echo**, **Webhook.site**, or **Pipedream** to get a test URL.
* Update `WEBHOOK_URL` in `src/components/SaveModal.jsx`:

```js
const WEBHOOK_URL = "https://eoxdqrondvdi0rj.m.pipedream.net"; 
```

* Data sent on save:

```json
{
  "segment_name": "last_10_days_blog_visits",
  "schema": [
    {"first_name": "First Name"},
    {"last_name": "Last Name"}
  ]
}
```

## Technologies

* React + Hooks
* Bootstrap 5
* React-Toastify

## License

MIT


