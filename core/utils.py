import random
import string

ALPHANUMRIC_CHARS = string.ascii_lowercase + string.digits
STRING_LENGTH = 6

def generate_random_string(chars=ALPHANUMRIC_CHARS,length=STRING_LENGTH):
    return ''.join(random.choice(chars) for _ in range(length))