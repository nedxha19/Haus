<script>
  import { enhance } from '$app/forms';
  let { data } = $props();
</script>

<section class="admin-container">
  <header class="admin-header">
    <h1>Property Management</h1>
    <a href="propertySystem/addProperty" class="add-button">+ Add New Property</a>
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
    color: #1f2937;
    background-color: #f9fafb;
    box-sizing: border-box;
  }

  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 30px;
  }

  .admin-header h1 {
    font-size: 1.75rem;
    color: #0f172a;
    font-weight: 600;
  }

  .add-button {
    background-color: #0ea5e9;
    color: white;
    padding: 10px 18px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: background-color 0.3s;
  }

  .add-button:hover {
    background-color: #0284c7;
  }

  .property-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
  }

  .property-card {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .property-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.1);
  }

  .image-container {
    width: 100%;
    height: 180px;
    overflow: hidden;
  }

  .property-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .property-info {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    background: #f8fafc;
  }

  .property-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #0ea5e9;
    margin-bottom: 2px;
  }

  .property-address {
    font-size: 0.9rem;
    color: #6b7280;
  }

  .property-stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.85rem;
    color: #374151;
  }

  .icon {
    color: #9ca3af;
  }

  .property-price-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .property-price {
    font-size: 1rem;
    font-weight: bold;
    color: #0284c7;
  }

  .property-type {
    font-size: 0.85rem;
    font-style: italic;
    color: #6b7280;
  }

  .delete-button {
    margin-top: 10px;
    padding: 10px;
    border: none;
    border-radius: 6px;
    background-color: #ef4444;
    color: white;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .delete-button:hover {
    background-color: #dc2626;
  }

  @media (max-width: 768px) {
    .admin-header h1 {
      font-size: 1.5rem;
    }

    .property-image {
      height: 150px;
    }
  }
</style>
