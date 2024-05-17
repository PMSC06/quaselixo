from flask import Flask, request, send_file, render_template
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upscale', methods=['POST'])
def upscale():
    if 'image' not in request.files:
        return 'No image uploaded', 400

    image_file = request.files['image']
    image_path = 'static/uploaded_image.png'  # Salva a imagem no diretório estático
    image_file.save(image_path)

    upscale_command = ['realesrgan-ncnn-vulkan.exe', '-i', image_path, '-o', 'static/output.png']  # Upscaling da imagem e salva no diretório estático
    subprocess.run(upscale_command)

    return send_file('static/output.png', mimetype='image/png')  # Envia a imagem upscale como resposta

if __name__ == '__main__':
    app.run(debug=True)