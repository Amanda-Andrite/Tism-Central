<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { notification, showNotification } from '$lib/stores/notification';
  import { showAuthModal, resetAuthState } from '$lib/authModal';
  let activeId = 1;
  let accountInfo = {};
  let privacySettings = {};
  let cardInfo = {};
  let editableInfo = false;
  let isGuest = false;


  onMount(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    isGuest = localStorage.getItem('isGuest') === 'true';
    
    if (isGuest) {
      accountInfo = {
        username: 'Username',
        email: 'user@example.com',
        password: '********'
      };

      privacySettings = {
        profileVisibility: 'Public',
        location: 'ireland',
        notifications: 'Enabled'
      };

      cardInfo = {
        cardNumber: '**** **** **** 1234',
        expirationDate: '12/24',
        cardholderName: 'John Doe',
        securityCode: '***',
        fullName: 'John Doe',
        streetAddress: '123 Main St',
        city: 'Anytown',
        province: 'State',
        postalCode: '12345',
      };
    }
    if (isLoggedIn === 'true') {
      const storedEmail = localStorage.getItem('userEmail');
      const storedVisibility = localStorage.getItem('profileVisibility');
      const storedLocation = localStorage.getItem('location');
      const storedNotification = localStorage.getItem('notifications');
      const storedCardNumber = localStorage.getItem('cardNumber');
      const storedExpirationDate = localStorage.getItem('expirationDate');
      const storedCardholderName = localStorage.getItem('cardholderName');
      const storedSecurityCode = localStorage.getItem('securityCode');
      const storedFullName = localStorage.getItem('fullName');
      const storedStreetAddress = localStorage.getItem('streetAddress');
      const storedCity = localStorage.getItem('city');
      const storedProvince = localStorage.getItem('province');
      const storedPostalCode = localStorage.getItem('postalCode');

      accountInfo = {
        username: 'Username',
        email: storedEmail || 'user@example.com',
        password: '********'
      };
      privacySettings = {
        profileVisibility: storedVisibility || 'Public',
        location: storedLocation || 'ireland',
        notifications: storedNotification || 'Enabled'
      };
      cardInfo = {
        cardNumber: storedCardNumber || '**** **** **** 1234',
        expirationDate: storedExpirationDate || '12/24',
        cardholderName: storedCardholderName || 'John Doe',
        securityCode: storedSecurityCode || '***',
        fullName: storedFullName || 'John Doe',
        streetAddress: storedStreetAddress || '123 Main St',
        city: storedCity || 'Anytown',
        province: storedProvince || 'State',
        postalCode: storedPostalCode || '12345',
      };
      editableInfo = true;
    }

  });

  let buttons = [
    { id: 1, name: 'account info' },
    { id: 2, name: 'privacy' },
    { id: 3, name: 'card information' }
  ];

  function saveInfo() {
    localStorage.setItem('userEmail', accountInfo.email);
    localStorage.setItem('profileVisibility', privacySettings.profileVisibility);
    localStorage.setItem('location', privacySettings.location);
    localStorage.setItem('notifications', privacySettings.notifications);
    localStorage.setItem('cardNumber', cardInfo.cardNumber);
    localStorage.setItem('expirationDate', cardInfo.expirationDate);
    localStorage.setItem('cardholderName', cardInfo.cardholderName);
    localStorage.setItem('securityCode', cardInfo.securityCode);
    localStorage.setItem('fullName', cardInfo.fullName);
    localStorage.setItem('streetAddress', cardInfo.streetAddress);
    localStorage.setItem('city', cardInfo.city);
    localStorage.setItem('province', cardInfo.province);
    localStorage.setItem('postalCode', cardInfo.postalCode);
  }
  function openAuthModal() {
		resetAuthState();
		showAuthModal.set(true);
	}
  

</script>

{#if $notification}
	<div class="notification show">
		{$notification}
	</div>
{/if}

<div class="account-page">

  <div class="sidebar">
  {#if isGuest}
    <h1 class="account-username">Guest</h1>
  {:else}
    <h1 class="account-username">{accountInfo.username}</h1>
  {/if}
    <div class="account-icon">
      <img class="account-image" src="{base}/favicon.png" alt="account-icon">
    </div>
    <div class="account-settings-options">
    {#each buttons as button}
      <button
        class="account-settings-button"
        class:active={button.id === activeId}
        on:click={() => {activeId = button.id;}}
      >
        {button.name}
      </button>
    {/each}
  </div>
  </div>
  <div class="settings-information">
    {#if activeId === 1}
    <div class="form-group">
      <label for="username">Username:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="username" bind:value={accountInfo.username}>
      {:else}
        <input class="form-control" type="text" id="username" bind:value={accountInfo.username} disabled>
      {/if}
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      {#if editableInfo}
        <input class="form-control" type="email" id="email" bind:value={accountInfo.email}>
      {:else}
        <input class="form-control" type="email" id="email" bind:value={accountInfo.email} disabled>
      {/if}
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      {#if editableInfo}
        <input class="form-control" type="password" id="password" bind:value={accountInfo.password}>
      {:else}
        <input class="form-control" type="password" id="password" bind:value={accountInfo.password} disabled>
      {/if}
    </div>
    {:else if activeId === 2}
    <div class="form-group">
      <label for="profileVisibility">Profile Visibility:</label>
      {#if editableInfo}
        <select class="form-control" id="profileVisibility" bind:value={privacySettings.profileVisibility}>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      {:else}
        <select class="form-control" id="profileVisibility" bind:value={privacySettings.profileVisibility} disabled>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      {/if}
    </div>
    <div class="form-group">
      <label for="location">Location:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="location" bind:value={privacySettings.location}>
      {:else}
        <input class="form-control" type="text" id="location" bind:value={privacySettings.location} disabled>
      {/if}
    </div>
    <div class="form-group">
      <label for="notifications">Notifications:</label>
      {#if editableInfo}
        <select class="form-control" id="notifications" bind:value={privacySettings.notifications}>
          <option value="Enabled">Enabled</option>
          <option value="Disabled">Disabled</option>
        </select>
      {:else}
        <select class="form-control" id="notifications" bind:value={privacySettings.notifications} disabled>
          <option value="Enabled">Enabled</option>
          <option value="Disabled">Disabled</option>
        </select>
      {/if}
    </div>

    {:else if activeId === 3}
    <div class="form-group">
      <label for="cardNumber">Card Number:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="cardNumber" bind:value={cardInfo.cardNumber}>
      {:else}
        <input class="form-control" type="text" id="cardNumber" bind:value={cardInfo.cardNumber} disabled>
      {/if}
    </div>
    <div class="form-group">
      <label for="expirationDate">Expiration Date:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="expirationDate" bind:value={cardInfo.expirationDate}>
      {:else}
        <input class="form-control" type="text" id="expirationDate" bind:value={cardInfo.expirationDate} disabled>
      {/if}
    </div>
    <div class="form-group">
      <label for="cardholderName">Cardholder Name:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="cardholderName" bind:value={cardInfo.cardholderName}>
      {:else}
        <input class="form-control" type="text" id="cardholderName" bind:value={cardInfo.cardholderName} disabled>
      {/if}
    </div>
    <div class="form-group">
      <label for="securityCode">Security Code:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="securityCode" bind:value={cardInfo.securityCode}>
      {:else}
        <input class="form-control" type="text" id="securityCode" bind:value={cardInfo.securityCode} disabled>
      {/if}
    </div>
    <div class="form-group">
      <h2 for="streetAddress">Billing Address:</h2>
      <label for="fullName">Full Name:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="fullName" bind:value={cardInfo.fullName}>
      {:else}
        <input class="form-control" type="text" id="fullName" bind:value={cardInfo.fullName} disabled>
      {/if}
      <label for="streetAddress">Street Address:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="streetAddress" bind:value={cardInfo.streetAddress}>
      {:else}
        <input class="form-control" type="text" id="streetAddress" bind:value={cardInfo.streetAddress} disabled>
      {/if}
      <label for="city">City:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="city" bind:value={cardInfo.city} placeholder="City">
      {:else}
        <input class="form-control" type="text" id="city" bind:value={cardInfo.city} placeholder="City" disabled>
      {/if}
      <label for="province">Province:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="province" bind:value={cardInfo.province} placeholder="Province">
      {:else}
        <input class="form-control" type="text" id="province" bind:value={cardInfo.province} placeholder="Province" disabled>
      {/if}
      <label for="postalCode">Postal Code:</label>
      {#if editableInfo}
        <input class="form-control" type="text" id="postalCode" bind:value={cardInfo.postalCode} placeholder="Postal Code">
      {:else}
        <input class="form-control" type="text" id="postalCode" bind:value={cardInfo.postalCode} placeholder="Postal Code" disabled>
      {/if}
    </div>
    {/if}
    <div class="button-group">
    {#if !isGuest}
      <button class="save-button" on:click={saveInfo()}> Save</button>
    {:else}
      <button class="save-button" on:click={showNotification("Please log in to save your information.")}> Save</button>
      <button class="login-button" on:click={openAuthModal}>Log In / Sign Up</button>
    {/if}
    </div>

  </div>
</div>

<style>
.account-page {
    display: flex;
    
}
.sidebar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.account-icon {
    width: 19rem;
    height: 300px;
    margin-top: var(--space-lg);
    background-color: var(--color-background);
    border: 20px solid var(--card-background);
    border-radius: var(--card-radius);
    justify-content: left;
    align-self: flex-start; 
    margin-left: 150px; 
}
.account-username {
    margin-top: 10px;
    font-size: 25px;
    font-weight: bold;
    align-self: center;
    justify-content: center;
    
}
.account-icon .account-image {
    width: 100%;
    height: 100%;
    object-fit: cover; 
}
.account-settings-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    align-self: flex-start; 
    margin-left: 150px;
}
.account-settings-button {    
    padding: 25px 90px;
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--card-background);
    color: var(--color-background);
    cursor: pointer;
    font-size: 16px;
}
.account-settings-button:hover {
    background-color: rgb(106, 106, 106);
}
.account-settings-button.active {
    background-color: rgb(106, 106, 106);
}
.settings-information{
    display: flex;
    flex-direction: column;
    padding-top: 100px;
    padding-left: 50px;
    padding-right: 150px;
    gap: var(--space-sm);
    width: 80%;

}
.settings-information label {
    font-size: 18px;
    margin-bottom: 5px;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--card-padding);
    background-color: var(--color-background);
    border: var(--card-background) solid 40px;
    border-radius: var(--card-radius);
}
.form-control {
    padding: var(--space-sm);
    border: 1px solid #a5a5a5;
    background-color: var(--card-background);
    border-radius: var(--radius-sm);
    width: 300px;
}
.button-group {
    display: flex;
    gap: var(--space-sm);
    margin-top: var(--space-md);
    justify-content: flex-end;
}
.save-button {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    padding: var(--card-padding) 40px;
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--divider-color);
    color: var(--color-background);
    cursor: pointer;
    font-size: 16px;
}
.save-button:hover {
    background-color: rgb(106, 106, 106);
}
.login-button {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    padding: var(--card-padding) 40px;
    border: none;
    border-radius: var(--radius-sm);
    background-color: var(--divider-color);
    color: var(--color-background);
    cursor: pointer;
    font-size: 16px;
}
.login-button:hover {
    background-color: rgb(106, 106, 106);
}
	.notification {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: black;
		color: white;
		padding: var(--space-sm) 20px;
		border-radius: var(--radius-md);
		font-size: var(--font-sm);
		z-index: 1000;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	/* Show notification */
	.notification.show {
		opacity: 1;
	}

  @media (max-width: 768px) {
    .account-page {
      flex-direction: column;
      align-items: center;
    }
    .sidebar {
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);
    }
    .account-icon {
      width: 100%;
      max-width: 20rem;        
      aspect-ratio: 2 / 2; 
      margin-left: 0;
      align-self: center;
    }
    .account-username {
      font-size: 20px;
    }
    .account-settings-options {
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
      gap: var(--space-sm);
      margin-left: 0;
    }
    .settings-information {
      padding: var(--space-sm);
      width: 100%;
    }
    .form-control {
      width: 100%;
    }
  }
    
</style>