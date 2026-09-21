async function handleForm(e) {
    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('.btn-send');

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const project = form.querySelector('[name="project"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
        return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
        const response = await fetch('http://127.0.0.1:8000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                project,
                message
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || 'Something went wrong.');
        }

        btn.textContent = 'Message sent ✓';

        setTimeout(() => {
            btn.textContent = 'Send Message →';
            form.reset();
            btn.disabled = false;
        }, 3000);

    } catch (error) {
        console.error(error);

        btn.textContent = 'Failed to send';

        setTimeout(() => {
            btn.textContent = 'Send Message →';
            btn.disabled = false;
        }, 3000);
    }
}