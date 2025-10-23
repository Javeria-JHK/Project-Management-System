// tests/e2e/signInInvalid.e2e.test.js
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

// Helper delay (to slow down for visibility)
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function invalidSignInTest() {
  const options = new chrome.Options();
   options.addArguments("--start-maximized");
  // following line is to not to watch the browser actions
  // options.addArguments("--headless=new");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    console.log("\n🚀 Starting E2E Invalid Sign-In Test...\n");

    console.log("🧭 Opening Sign In page...");
    await driver.get("http://localhost:5173/signin");
    await delay(1000);

    console.log("🔍 Waiting for form fields...");
    const emailInput = await driver.wait(until.elementLocated(By.css("input[type='email']")), 5000);
    const passwordInput = await driver.findElement(By.css("input[type='password']"));
    const signInButton = await driver.findElement(By.xpath("//button[contains(.,'Sign In')]"));
    await delay(500);

    console.log("✍️ Typing invalid credentials...");
    await emailInput.sendKeys("wronguser@example.com");
    await delay(400);
    await passwordInput.sendKeys("wrongpassword");
    await delay(1000);

    console.log("🖱️ Clicking Sign In...");
    await signInButton.click();
    await delay(2000);

    console.log("⏳ Checking if login failed...");
    const currentUrl = await driver.getCurrentUrl();

    // --- OPTION 1: Verify user did NOT leave /signin page ---
    if (currentUrl.includes("/signin")) {
      console.log("✅ User stayed on Sign-In page (expected for invalid credentials).");
    } else {
      console.log("❌ Unexpected redirect — login might have succeeded incorrectly.");
    }

    // --- OPTION 2: Verify an error message appeared (optional) ---
    try {
      const errorMsg = await driver.findElement(By.css(".error-alert"));
      const text = await errorMsg.getText();
      console.log("⚠️ Found error message:", text);
    } catch {
      console.log("ℹ️ No explicit error message found (might be toast or hidden).");
    }

  } catch (err) {
    console.error("❌ Test failed:", err.message);
  } finally {
    console.log("\n🧹 Closing browser...");
    await delay(1000);
    await driver.quit();
    console.log("🏁 Invalid Sign-In Test finished.\n");
  }
}

invalidSignInTest();
