import time
import hashlib

def hash(data):

    return hashlib.sha256(data).hexdigest()


def create_block(data,prev_hash,index):

    timestamp = time.time()
    nonce = 0 

    while True:

        hashed_string = hash(f"{index}{prev_hash}{data}{timestamp}{nonce}")

        if hashed_string.startswith("0000"):

            return {
                data : data,
                nonce : nonce ,
                time: timestamp,
                prev_hash: prev_hash,
                hash : hashed_string
            }
        
        nonce += 1 


def create_blockchain(num_blocks):

    blockchain = []

    prev_hash = '0'

    for i in range(num_blocks):

        block = create_block('a'+i,prev_hash,i)

        blockchain.append(block)

        prev_hash = block['hash']

    return blockchain