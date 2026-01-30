import requests
import sys
import json
from datetime import datetime

class ClarityLabsAPITester:
    def __init__(self, base_url="https://videoforsaas.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                'test_name': name,
                'endpoint': endpoint,
                'method': method,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'response_data': None,
                'error': None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result['response_data'] = response.json()
                    print(f"   Response: {json.dumps(result['response_data'], indent=2)}")
                except:
                    result['response_data'] = response.text
                    print(f"   Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result['error'] = error_data
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    result['error'] = response.text
                    print(f"   Error: {response.text}")

            self.test_results.append(result)
            return success, result['response_data'] if success else result['error']

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                'test_name': name,
                'endpoint': endpoint,
                'method': method,
                'expected_status': expected_status,
                'actual_status': 'ERROR',
                'success': False,
                'response_data': None,
                'error': str(e)
            }
            self.test_results.append(result)
            return False, str(e)

    def test_health_endpoints(self):
        """Test basic health endpoints"""
        print("\n" + "="*50)
        print("TESTING HEALTH ENDPOINTS")
        print("="*50)
        
        # Test root endpoint
        self.run_test("API Root", "GET", "api/", 200)
        
        # Test health check
        self.run_test("Health Check", "GET", "api/health", 200)

    def test_newsletter_endpoints(self):
        """Test newsletter subscription functionality"""
        print("\n" + "="*50)
        print("TESTING NEWSLETTER ENDPOINTS")
        print("="*50)
        
        # Test newsletter subscription with new email
        test_email = f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        success, response = self.run_test(
            "Newsletter Subscription - New Email",
            "POST",
            "api/newsletter/subscribe",
            200,
            data={"email": test_email}
        )
        
        if success:
            # Test duplicate subscription
            self.run_test(
                "Newsletter Subscription - Duplicate Email",
                "POST",
                "api/newsletter/subscribe",
                200,
                data={"email": test_email}
            )
        
        # Test invalid email format
        self.run_test(
            "Newsletter Subscription - Invalid Email",
            "POST",
            "api/newsletter/subscribe",
            422,  # Validation error
            data={"email": "invalid-email"}
        )
        
        # Test missing email
        self.run_test(
            "Newsletter Subscription - Missing Email",
            "POST",
            "api/newsletter/subscribe",
            422,  # Validation error
            data={}
        )
        
        # Test get subscribers (should work)
        self.run_test(
            "Get Newsletter Subscribers",
            "GET",
            "api/newsletter/subscribers",
            200
        )

    def test_contact_endpoints(self):
        """Test contact request functionality"""
        print("\n" + "="*50)
        print("TESTING CONTACT ENDPOINTS")
        print("="*50)
        
        # Test valid contact request
        test_email = f"contact_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        success, response = self.run_test(
            "Contact Request - Video Audit",
            "POST",
            "api/contact",
            200,
            data={
                "name": "Test User",
                "email": test_email,
                "company": "Test Company",
                "message": "I need a video audit for my SaaS product",
                "request_type": "video_audit"
            }
        )
        
        # Test consultation request
        self.run_test(
            "Contact Request - Consultation",
            "POST",
            "api/contact",
            200,
            data={
                "name": "Test Founder",
                "email": f"founder_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com",
                "company": "Startup Inc",
                "request_type": "consultation"
            }
        )
        
        # Test minimal contact request
        self.run_test(
            "Contact Request - Minimal Data",
            "POST",
            "api/contact",
            200,
            data={
                "name": "Minimal User",
                "email": f"minimal_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
            }
        )
        
        # Test invalid email in contact
        self.run_test(
            "Contact Request - Invalid Email",
            "POST",
            "api/contact",
            422,
            data={
                "name": "Test User",
                "email": "invalid-email"
            }
        )
        
        # Test missing required fields
        self.run_test(
            "Contact Request - Missing Name",
            "POST",
            "api/contact",
            422,
            data={
                "email": "test@example.com"
            }
        )
        
        # Test get contact requests
        self.run_test(
            "Get Contact Requests",
            "GET",
            "api/contact/requests",
            200
        )

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        print(f"📊 Tests passed: {self.tests_passed}/{self.tests_run}")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            
        print("\nFailed tests:")
        for result in self.test_results:
            if not result['success']:
                print(f"❌ {result['test_name']} - {result['endpoint']} - Status: {result['actual_status']}")
                if result['error']:
                    print(f"   Error: {result['error']}")
        
        return self.tests_passed == self.tests_run

def main():
    print("🚀 Starting Clarity Labs API Tests")
    print("="*60)
    
    tester = ClarityLabsAPITester()
    
    # Run all test suites
    tester.test_health_endpoints()
    tester.test_newsletter_endpoints()
    tester.test_contact_endpoints()
    
    # Print summary
    all_passed = tester.print_summary()
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())