<script>
    import { enhance } from '$app/forms';
    let { form, data } = $props();
</script>

<main class="form-container">
    <h1>Add New Property</h1>
    <form action="?/upload" method="POST" use:enhance enctype="multipart/form-data" class="property-form">
        
        <div class="form-section">
            <h2>📷 Property Image</h2>
            <label>
                <input type="file" name="image" required />
            </label>
        </div>

        <div class="form-section">
            <h2>🏠 Property Details</h2>

            <label>Location:
                <input type="text" name="location" required />
            </label>

            <label>Type:
                <input type="text" name="type" required />
            </label>

            <label>Price ($):
                <input type="number" step="0.01" name="price" required />
            </label>

            <label>Bedrooms:
                <input type="number" name="bedrooms" required />
            </label>

            <label>Bathrooms:
                <input type="number" name="bathrooms" required />
            </label>

            <label>Square Foot:
                <input type="number" name="square_foot" required />
            </label>

            <label>Address:
                <input type="text" name="address" />
            </label>
        </div>

        <button type="submit" class="submit-btn">➕ Submit Property</button>
    </form>

    {#if form}
        <div class="success-msg">
            <p>✅ Property successfully added!</p>
        </div>
    {/if}
</main>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
    background-color: #f4f7f9;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
}

.form-container {
    max-width: 720px;
    margin: 40px auto;
    padding: 35px;
    background: #fff;
    color: #333;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 1px solid #e0e0e0;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 32px;
    color: #007bff;
    font-weight: 700;
}

.property-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.form-section {
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    background-color: #fafafa;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.03);
}

.form-section h2 {
    font-size: 18px;
    color: #555;
    margin-bottom: 15px;
}

label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    gap: 5px;
    margin-bottom: 15px;
    color: #444;
}

input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 15px;
    transition: all 0.2s ease-in-out;
}

input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    outline: none;
}

.submit-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 14px 22px;
    cursor: pointer;
    border-radius: 8px;
    font-size: 17px;
    font-weight: 600;
    align-self: center;
    transition: background-color 0.3s, transform 0.1s;
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
}

.submit-btn:hover {
    background-color: #0069d9;
    transform: translateY(-1px);
}

.success-msg {
    margin-top: 25px;
    text-align: center;
    color: #28a745;
    font-weight: 600;
    font-size: 18px;
    animation: fadeIn 0.6s ease forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Mobile responsive */
@media (max-width: 600px) {
    .form-container {
        padding: 25px;
    }

    .form-section {
        padding: 15px;
    }

    h1 {
        font-size: 26px;
    }

    .submit-btn {
        width: 100%;
    }
}
</style>
