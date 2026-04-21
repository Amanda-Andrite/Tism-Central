<script>
  let activeId = null;

  let accountInfo = {
    username: 'Username',
    email: 'user@example.com',
    password: '********'
  };

  let privacySettings = {
    profileVisibility: 'Public',
    location: 'ireland',
    notifications: 'Enabled'
  }

  let cardInfo = {
    cardNumber: '**** **** **** 1234',
    expirationDate: '12/24',
    cardholderName: 'John Doe',
    securityCode: '***',
    fullName: 'John Doe',
    streetAddress: '123 Main St',
    city: 'Anytown',
    province: 'State',
    postalCode: '12345',
  }


  let buttons = [
    { id: 1, name: 'account info' },
    { id: 2, name: 'privacy' },
    { id: 3, name: 'card information' }
  ];
</script>

<div class="account-page">

  <div class="sidebar">
  <h1 class="account-username">{accountInfo.username}</h1>
    <div class="account-icon">
      <img class="account-image" src="/favicon.png" alt="account-icon">
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
      <input class="form-control" type="text" id="username" bind:value={accountInfo.username}>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input class="form-control" type="email" id="email" bind:value={accountInfo.email}>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input class="form-control" type="password" id="password" bind:value={accountInfo.password}>
    </div>
    {:else if activeId === 2}
    <div class="form-group">
      <label for="profileVisibility">Profile Visibility:</label>
      <select class="form-control" id="profileVisibility" bind:value={privacySettings.profileVisibility}>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select>
    </div>
    <div class="form-group">
      <label for="location">Location:</label>
      <input class="form-control" type="text" id="location" bind:value={privacySettings.location}>
    </div>
    <div class="form-group">
      <label for="notifications">Notifications:</label>
      <select class="form-control" id="notifications" bind:value={privacySettings.notifications}>
        <option value="Enabled">Enabled</option>
        <option value="Disabled">Disabled</option>
      </select>
    </div>

    {:else if activeId === 3}
    <div class="form-group">
      <label for="cardNumber">Card Number:</label>
      <input class="form-control" type="text" id="cardNumber" bind:value={cardInfo.cardNumber}>
    </div>
    <div class="form-group">
      <label for="expirationDate">Expiration Date:</label>
      <input class="form-control" type="text" id="expirationDate" bind:value={cardInfo.expirationDate}>
    </div>
    <div class="form-group">
      <label for="cardholderName">Cardholder Name:</label>
      <input class="form-control" type="text" id="cardholderName" bind:value={cardInfo.cardholderName}>
    </div>
    <div class="form-group">
      <label for="securityCode">Security Code:</label>
      <input class="form-control" type="text" id="securityCode" bind:value={cardInfo.securityCode}>
    </div>
    <div class="form-group">
      <h2 for="streetAddress">Billing Address:</h2>
      <label for="fullName">Full Name:</label>
      <input class="form-control" type="text" id="fullName" bind:value={cardInfo.fullName}>
      <label for="streetAddress">Street Address:</label>
      <input class="form-control" type="text" id="streetAddress" bind:value={cardInfo.streetAddress}>
      <label for="city">City:</label>
      <input class="form-control" type="text" id="city" bind:value={cardInfo.city} placeholder="City">
      <label for="province">Province:</label>
      <input class="form-control" type="text" id="province" bind:value={cardInfo.province} placeholder="Province">
      <label for="postalCode">Postal Code:</label>
      <input class="form-control" type="text" id="postalCode" bind:value={cardInfo.postalCode} placeholder="Postal Code">
    </div>
    {/if}
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
    margin-top: 20px;
    background-color: rgb(255, 255, 255);
    border: 20px solid rgb(129, 129, 129);
    border-radius: 10px;
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
    border-radius: 5px;
    background-color: rgb(129, 129, 129);
    color: white;
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
    gap: 50px;
    width: 80%;

}
.settings-information label {
    font-size: 18px;
    margin-bottom: 5px;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border: rgb(106, 106, 106) solid 40px;
    border-radius: 10px;
}
.form-control {
    padding: 10px;
    border: 1px solid #a5a5a5;
    background-color: rgb(170, 170, 170);
    border-radius: 4px;
    width: 300px;
}
    
</style>