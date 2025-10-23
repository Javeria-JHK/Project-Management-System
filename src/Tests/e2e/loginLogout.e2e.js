import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

// Helper delay (to slow down for visibility)
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const dashboardUrl = "http://localhost:5173/";
const signInUrl = "http://localhost:5173/signin";

async function testLoginAndLogout() {

      const options = new chrome.Options();
      options.addArguments("--start-maximized");
      options.addArguments("--disable-password-manager-reauth");
      // following line is to not to watch the browser actions UI
    //   options.addArguments("--headless=new");
    
      const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();


  try {
    // Step 1: Open the app and find form 
    console.log("Opening the app...")
    await driver.get("http://localhost:5173/signin");
    await delay(1000);

        console.log("🔍 Waiting for form fields...");
        const emailInput = await driver.wait(until.elementLocated(By.css("input[type='email']")), 5000);
        const passwordInput = await driver.findElement(By.css("input[type='password']"));
        const signInButton = await driver.findElement(By.xpath("//button[contains(.,'Sign In')]"));
        await delay(500);

        
    // Step 2: Fill login form
    console.log("✍️ Typing credentials...");
    await emailInput.sendKeys("ali@example.com");
    await delay(500);
    await passwordInput.sendKeys("123456");
    await delay(1000);

    console.log("🖱️ Clicking Sign In button...");
    await signInButton.click();
    await delay(1000);

    console.log("⏳ Waiting for navigation...");

    // Step 3: Navigate to the dashboard

    await driver.wait(async () => {
    const currentUrl = await driver.getCurrentUrl();
    console.log("🌐 Current URL:", currentUrl);
   
    return currentUrl === dashboardUrl;
    }, 15000);

    const currentUrl = await driver.getCurrentUrl();

    if (currentUrl === dashboardUrl) {
    console.log("✅ Login successful! Redirected exactly to Dashboard.\n");
    await delay(2500);

     // Step 4: Find log out button and click

    const logout = await driver.findElement(By.xpath("//button[contains(.,'Log Out')]"));
    await delay(1000);

    console.log("🖱️ Clicking Logout button...");
    await logout.click();
    await delay(1000);

    console.log("⏳ Waiting for navigation to Signin page...");
   
     // Step 5: Navigate back to the Signin page

         
      await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      console.log("🌐 Current URL:", currentUrl);
   
      return currentUrl === signInUrl;
    }, 15000);

    const currentUrl = await driver.getCurrentUrl();
    await delay(1000);

    if (currentUrl === signInUrl) {
    console.log("✅ Logout successful! Redirected exactly to SignIn.\n");
    }
  else {
    console.log(`❌ Redirected to unexpected URL: ${currentUrl}\n`);
    }

    }
  else {
    console.log(`❌ Redirected to unexpected URL: ${currentUrl}\n`);
    }

  } catch (err) {
    console.error("❌ Test failed:", err);
  } finally {
    await driver.quit();
  }
}

testLoginAndLogout();
