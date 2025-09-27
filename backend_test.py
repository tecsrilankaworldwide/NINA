import requests
import sys
import json
from datetime import datetime

class TecaiKidsAPITester:
    def __init__(self, base_url="https://tecai-learning-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, description=""):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        if description:
            print(f"   Description: {description}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                    if isinstance(result["response_data"], list):
                        print(f"   Response: List with {len(result['response_data'])} items")
                    elif isinstance(result["response_data"], dict):
                        print(f"   Response keys: {list(result['response_data'].keys())}")
                except:
                    result["response_data"] = response.text
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error"] = error_data
                    print(f"   Error: {error_data}")
                except:
                    result["error"] = response.text
                    print(f"   Error: {response.text}")

            self.test_results.append(result)
            return success, result["response_data"]

        except Exception as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, {}

    def test_programs_api(self):
        """Test programs-related endpoints"""
        print("\n" + "="*50)
        print("TESTING PROGRAMS API")
        print("="*50)
        
        # Test get all programs
        success, programs_data = self.run_test(
            "Get All Programs",
            "GET",
            "programs",
            200,
            description="Should return list of all 5 programs with pricing and features"
        )
        
        if success and programs_data:
            print(f"   Found {len(programs_data)} programs")
            for program in programs_data:
                print(f"   - {program.get('name', 'Unknown')} ({program.get('age_range', 'Unknown age')})")
        
        # Test get specific program
        self.run_test(
            "Get Specific Program",
            "GET",
            "programs/smart_kids",
            200,
            description="Should return Smart Kids Mastery program details"
        )
        
        return programs_data if success else []

    def test_stats_api(self):
        """Test stats endpoint"""
        print("\n" + "="*50)
        print("TESTING STATS API")
        print("="*50)
        
        success, stats_data = self.run_test(
            "Get Platform Stats",
            "GET",
            "stats",
            200,
            description="Should return platform statistics for hero section"
        )
        
        if success and stats_data:
            print("   Stats received:")
            for key, value in stats_data.items():
                print(f"   - {key}: {value}")
        
        return stats_data if success else {}

    def test_enrollment_api(self):
        """Test enrollment endpoints"""
        print("\n" + "="*50)
        print("TESTING ENROLLMENT API")
        print("="*50)
        
        # Test enrollment creation
        enrollment_data = {
            "student_full_name": "Test Student",
            "parent_guardian_name": "Test Parent",
            "email": "test@example.com",
            "phone": "+94771234567",
            "address": "123 Test Street, Colombo, Sri Lanka",
            "program_type": "smart_kids",
            "payment_plan": "monthly",
            "payment_method": "card"
        }
        
        success, response_data = self.run_test(
            "Create Enrollment",
            "POST",
            "enrollment",
            200,
            data=enrollment_data,
            description="Should create new enrollment and return enrollment details with amount"
        )
        
        if success and response_data:
            print(f"   Enrollment created with ID: {response_data.get('id', 'Unknown')}")
            print(f"   Amount: LKR {response_data.get('amount', 0):,}")
        
        # Test get all enrollments
        self.run_test(
            "Get All Enrollments",
            "GET",
            "enrollments",
            200,
            description="Should return list of all enrollments"
        )

    def test_consultation_api(self):
        """Test consultation endpoints"""
        print("\n" + "="*50)
        print("TESTING CONSULTATION API")
        print("="*50)
        
        # Test consultation request creation
        consultation_data = {
            "full_name": "Test Parent",
            "email": "parent@example.com",
            "phone": "+94771234567",
            "child_age_group": "young_explorers",
            "learning_goals": "I want my child to develop strong logical thinking and coding skills for future career opportunities."
        }
        
        success, response_data = self.run_test(
            "Create Consultation Request",
            "POST",
            "consultation",
            200,
            data=consultation_data,
            description="Should create consultation request and return confirmation"
        )
        
        if success and response_data:
            print(f"   Consultation request created with ID: {response_data.get('id', 'Unknown')}")
        
        # Test get all consultation requests
        self.run_test(
            "Get All Consultation Requests",
            "GET",
            "consultations",
            200,
            description="Should return list of all consultation requests"
        )

    def test_root_endpoint(self):
        """Test root API endpoint"""
        print("\n" + "="*50)
        print("TESTING ROOT API")
        print("="*50)
        
        self.run_test(
            "API Root",
            "GET",
            "",
            200,
            description="Should return API welcome message"
        )

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting TecaiKids API Testing")
        print(f"🌐 Base URL: {self.base_url}")
        print(f"🔗 API URL: {self.api_url}")
        
        # Test all endpoints
        self.test_root_endpoint()
        programs_data = self.test_programs_api()
        stats_data = self.test_stats_api()
        self.test_enrollment_api()
        self.test_consultation_api()
        
        # Print final results
        print("\n" + "="*60)
        print("FINAL TEST RESULTS")
        print("="*60)
        print(f"📊 Tests passed: {self.tests_passed}/{self.tests_run}")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed! Backend API is working correctly.")
            return True
        else:
            print("❌ Some tests failed. Check the details above.")
            failed_tests = [test for test in self.test_results if not test["success"]]
            print(f"\n❌ Failed tests ({len(failed_tests)}):")
            for test in failed_tests:
                print(f"   - {test['test_name']}: {test['actual_status']} (expected {test['expected_status']})")
            return False

def main():
    tester = TecaiKidsAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    results_file = "/app/test_reports/backend_api_results.json"
    with open(results_file, 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": tester.tests_run,
            "passed_tests": tester.tests_passed,
            "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "0%",
            "overall_success": success,
            "test_details": tester.test_results
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: {results_file}")
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())