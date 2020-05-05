def is_prime (num)
    div =2
    while(div*div<=num)
        if(num%div)
            return false;
        end
        div=div+1;
    end
    return true
end
a=is_prime(11);
puts "Number 11 is prime"? +a.to_s();