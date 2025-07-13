Houseo\src\routes\admin\propertySystem\+page.svelte
<script>
    import { enhance } from '$app/forms';
    let { data } = $props();
</script>

<section class="admin-container">
    <header class="admin-header">
        <h1>Property Management</h1>
        <a href="propertySystem\addProperty" class="add-button">+ Add New Property</a>
    </header>

    <div class="property-grid">
        {#each data.properties as property (property.id)}
            <div class="property-card">
                <div class="image-container">
                    <img src={property.image} alt="Property House" class="property-image" />
                </div>
                <div class="property-info">
                    <h2 class="property-name">{property.location} — {property.type}</h2>
                    <p class="property-address">{property.address}</p>
                    <hr />
                    <div class="property-stats">
                        <div class="stat">
                            <i class="fas fa-ruler-combined icon"></i>
                            <span>{property.square_foot} sqft</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-bath icon"></i>
                            <span>{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-bed icon"></i>
                            <span>{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</span>
                        </div>
                    </div>
                    <hr />
                    <div class="property-price-type">
                        <span class="property-price">${property.price.toLocaleString()}</span>
                        <span class="property-type">{property.type}</span>
                    </div>
                    <form action="?/deleteProperty" method="POST" use:enhance>
                        <input type="hidden" name="id" value={property.id} />
                        <button type="submit" class="delete-button">Delete</button>
                    </form>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
.admin-container {
    max-width: 1400px;
    margin: auto;
    padding: 40px 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
}

.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.admin-header h1 {
    font-size: 32px;
    color: white;
}

.add-button {
    background-color: #007bff;
    color: white;
    padding: 10px 18px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;
}

.add-button:hover {
    background-color: #0056b3;
}

.property-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 25px;
}

.property-card {
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    height: 450px;
}

.property-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.image-container {
    width: 100%;
    height: 50%;
    overflow: hidden;
}

.property-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.property-info {
    padding: 16px;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #f8f9fa;
}

.property-name {
    font-size: 18px;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 8px;
}

.property-address {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
}

.property-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
}

.stat {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
}

.stat .icon {
    font-size: 18px;
    margin-right: 5px;
    color: #333;
}

hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 8px 0;
}

.property-price-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.property-price {
    font-size: 16px;
    font-weight: bold;
    color: #007bff;
}

.property-type {
    font-size: 14px;
    font-style: italic;
    color: #666;
}

.delete-button {
    margin-top: 12px;
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    font-weight: bold;
    transition: background-color 0.3s;
}

.delete-button:hover {
    background-color: #c82333;
}

@media (max-width: 1024px) {
    .property-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .property-grid {
        grid-template-columns: 1fr;
    }

    .property-card {
        width: 100%;
        margin-bottom: 20px;
    }

    .property-image {
        height: 200px;
    }

    .property-info {
        padding: 16px;
    }
}
</style>