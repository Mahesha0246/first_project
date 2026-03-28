# sum_two_numbers.py

def sum_two_numbers(a, b):
    """Return the sum of two numbers."""
    return a + b

if __name__ == "__main__":
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))
    result = sum_two_numbers(num1, num2)
    print(f"The sum of {num1} and {num2} is {result}")
